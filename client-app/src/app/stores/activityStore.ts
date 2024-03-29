import { makeAutoObservable, runInAction } from "mobx";

import { Activity, IActivity } from "../types/activity";
import agent from "../api/agent";
import { store } from "./store";
import { UserProfile } from "../types/profile";

export default class ActivityStore {
  activityRegistry = new Map<string, IActivity>();
  selectedActivity: IActivity | null = null;
  loadingInitial = true;
  submitting = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = activity.date;
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  }
  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list();
      runInAction(() => {
        activities.forEach((activity) => {
          this.setActivity(activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  private setActivity = (activity: IActivity) => {
    const user = store.userStore.user;
    if (user) {
      activity.isGoing = activity.attendees?.some(
        (a) => a.username === user.username
      );
      activity.isHost = activity.hostUsername === user.username;
      activity.host = activity.attendees?.find(
        (x) => x.username === activity.hostUsername
      );
    }
    this.activityRegistry.set(activity.id, activity);
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity ?? null;
          this.loadingInitial = false;
        });
      } catch (error) {
        console.log(error);
        runInAction(() => {
          this.loadingInitial = false;
        });
      }
    }
  };

  createActivity = async (activity: IActivity) => {
    this.submitting = true;
    const user = store.userStore.user;
    const attendee = new UserProfile(user!);
    try {
      await agent.Activities.create(activity);
      const newActivity = new Activity(activity);
      newActivity.hostUsername = user?.username;
      newActivity.attendees = [attendee];
      this.setActivity(newActivity);
      runInAction(() => {
        this.activityRegistry.set(newActivity.id, newActivity);
        this.selectedActivity = newActivity;
        this.submitting = false;
      });
      return newActivity;
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  updateActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        if (activity.id) {
          this.activityRegistry.set(activity.id, activity);
          this.selectedActivity = activity;
        }
        this.submitting = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.submitting = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.selectedActivity = null;
        this.submitting = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.submitting = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        if (this.selectedActivity?.isGoing) {
          this.selectedActivity.attendees =
            this.selectedActivity.attendees?.filter(
              (a) => a.username !== user?.username
            );
          this.selectedActivity.isGoing = false;
        } else {
          const attendee = new UserProfile(user!);
          this.selectedActivity?.attendees?.push(attendee);
          this.selectedActivity!.isGoing = true;
        }
        this.activityRegistry.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
        this.submitting = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  cancelActivityToggle = async () => {
    this.submitting = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        this.selectedActivity!.isCancelled =
          !this.selectedActivity?.isCancelled;
        this.activityRegistry.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
        this.submitting = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.submitting = false;
      });
    }
  };
}

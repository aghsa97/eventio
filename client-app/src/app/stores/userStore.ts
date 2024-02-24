import { User, UserFormValues } from "@/features/users/user";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";

export default class UserStore {
  user: User | null = null;
  constructor() {
    makeAutoObservable(this);
  }
  get isLoggedIn() {
    return !!this.user;
  }
  login = async (creds: UserFormValues) => {
    const user = await agent.Account.login(creds);
    store.commonStore.setToken(user.token);
    runInAction(() => {
      this.user = user;
    });
  };

  register = async (creds: UserFormValues) => {
    const user = await agent.Account.register(creds);
    store.commonStore.setToken(user.token);
    runInAction(() => {
      this.user = user;
    });
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
  };

  getUser = async () => {
    const user = await agent.Account.current();
    runInAction(() => {
      this.user = user;
    });
  };
}

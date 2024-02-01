using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // Map from Activity to ActivityDto
            CreateMap<Activity, Activity>();
        }
    }
}
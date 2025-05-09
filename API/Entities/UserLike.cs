using System;

namespace API.Entities;

public class UserLike
{
    public AppUser SourceUser { get; set; } = null!;
    public AppUser TargetUser { get; set; } = null!;
    public int SourceUserId { get; set; }
    public int TargetUserId { get; set; }

}

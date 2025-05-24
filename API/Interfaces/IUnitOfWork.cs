using System;

namespace API.Interfaces;

public interface IUnitOfWork
{
    IUserRepository UserRepository { get; }
    IMessageRepository MessageRepository { get; }
    ILikeRepository LikesRepository { get; }
    Task<bool> Complele();
    bool HasChanges();
}

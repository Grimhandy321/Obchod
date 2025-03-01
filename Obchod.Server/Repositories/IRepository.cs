using Obchod.Server.Models;

namespace Obchod.Server.Repositories
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();
        T GetById(int id);
        bool Add(T item);
        bool Update(T item);
        bool Delete(int id);
    }
}

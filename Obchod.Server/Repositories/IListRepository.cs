using Obchod.Server.Models;

namespace Obchod.Server.Repositories
{
    public interface IListRepository<T>
    {
        IEnumerable<T> GetAll();
        public List<T> GetById(int id);
        T GetObjById(int id);
        bool Add(T item);
        bool Update(T item);
        bool Delete(int id);
    }
}

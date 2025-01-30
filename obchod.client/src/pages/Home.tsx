import { useState } from 'react';
import { useHomeQuery } from '../api/query/useHomeQuery';
import { useQuerySuccess } from '../lib/useQuerySuccess';

function Home() {

    document.title = "Welcome";
    const [userInfo, setUserInfo] = useState<useHomeQuery.Result>({});
    const useHomeQueryResult = useHomeQuery({user:localStorage.getItem("user") });

    useQuerySuccess(useHomeQueryResult, async (data) => {
        setUserInfo(data);
    })

    return (
        <section className='page'>
            <header>
                <h1>Welcome to your page</h1>
            </header>
            {
                userInfo ?
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Created Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{userInfo.name}</td>
                                    <td>{userInfo.email}</td>
                                    <td>{userInfo.createdDate ? userInfo.createdDate.split("T")[0] : ""}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> :
                    <div className='warning'>
                        <div>Access Denied!!!</div>
                    </div>
            }
        </section>
    );
}

export default Home;
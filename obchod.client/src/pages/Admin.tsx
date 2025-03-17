import { useState } from 'react';
import { useQuerySuccess } from '../lib/useQuerySuccess';

function Admin() {

    document.title = "Admin";
    const [partners, setPartners] = useState([]);

    return (
        <section className='admin-page page'>
            <header>
                <h1>Admin page</h1>
            </header>
            <section>
                {
                    partners ?
                        <div>
                            <div>Our trusted partners are:</div>
                            <ol>
                                {partners.map((partner, i) => <li key={i}>{partner}</li>)}
                            </ol>
                        </div>
                        :
                        <div className='waiting-page'>
                            <div>Waiting...</div>
                        </div>
                }
            </section>
        </section>
    );
}

export default Admin;
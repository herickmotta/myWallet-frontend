import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { IoExitOutline } from "react-icons/io5";
import OperationsList from '../components/OperationsList';
import { Page } from '../components/shared/page';
import { Header } from '../components/shared/Header';
import axios from 'axios';
import UserNotFound from '../components/UserNotFound';
import RegisterBox from '../components/RegisterBox';
export default function Home() {
    const history = useHistory();
    const { user, setUser } = useUserContext();
    if (!user) {
        return(<UserNotFound/>);
    }

    useEffect(() => {
        updateUser();
    }, []);

    function updateUser() {
        axios.get(`http://localhost:3000/api/users/`,
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            .then((response) => {
                setUser({ ...user, balance: response.data.balance });
            }).catch(({response})=>{
                if(response.status === 401){
                    history.push('/sign-in');
                }
            });

    }
    function onSignOutRequest() {
        axios.post(
            'http://localhost:3000/api/users/sign-out',
            {},
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            },
          )
          .then((_r) => {
            setUser(null);
          })
          .catch((_e) => setUser(null));
      };

    function capitalize(string){
        return string[0].toUpperCase() + string.substring(1);
    }

    return (
        <Page>
            <Header>
                <h1>{`Hello, ${capitalize(user.name)}`}</h1>
                <div onClick={onSignOutRequest}><IoExitOutline /></div>
            </Header>
            <RegisterBox/>
            <OperationsList />
        </Page>
    );
}


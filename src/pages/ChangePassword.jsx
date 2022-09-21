import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Tabs } from 'antd';
import FormCom from '../components/LoginComponent/FormCom';
import { Navigate, Link } from "react-router-dom";
import FormRegister from '../components/LoginComponent/FormRegister';
import FormChange from '../components/LoginComponent/FormChange';

const { TabPane } = Tabs;

const ChangePassword = () => {
    const username = localStorage.getItem('username')
    const [isDone, setIsDone] = useState(false)

    return (
        <div style={{ display: 'flex', flexDirection:'column' ,width: '100%', height: '500px', alignText: 'center', backgroundImage: 'url("https://dichvuquangcao.vn/wp-content/uploads/2021/04/yty.png' }}>
            {isDone == false ?
                <div style={{ marginTop: "10%", display: "flex", justifyContent: "center" }}>
                    <div className="FormLogin">
                        <FormChange setIsDone={(data) => setIsDone(data)} />
                    </div>
                </div>
                :
                <div>
                    <Navigate to={"/"} />
                </div>
            }

        </div>


    )
}

export default ChangePassword
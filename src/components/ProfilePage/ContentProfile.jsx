import React, { useState, useEffect } from 'react';

import { Layout, Menu, Breadcrumb, Select, Input, Modal, Button, notification, List, Avatar, Space } from 'antd';
import {
    PlusOutlined,
    MailOutlined,
    FacebookOutlined,
    TeamOutlined,
    UserOutlined,
    HomeOutlined,
    MessageOutlined,
    LikeOutlined
} from '@ant-design/icons';
import ModalBlog from '../Homepage/ModalBlog';
import { deletePost, getAllPost, getAllPostByUser } from '../../apis/postApi';
import { Link } from 'react-router-dom';
import FooterCom from '../FooterCom';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import ModalProfile from './ModalProfile';
import { getAllCategory } from './../../apis/categoryApi';
import ModalEditPostProfile from './ModalEditPostProfile';
import { editAvatar, getAvatar } from '../../apis/authApi';
import { likeByUser } from '../../apis/likeApi';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;


const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const ContentProfile = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleEditAvatar, setIsModalVisibleEditAvatar] = useState(false);
    const [posts, setPosts] = useState([])
    const [isRender, setIsRender] = useState(false);
    const [category, setCategory] = useState([])
    const [avatar, setAvatar] = useState("");
    const [avatarEdit, setAvatarEdit] = useState("");

    useEffect(() => {
        getAllPostByUser()
            .then(res => setPosts(res.data.reverse()))
            .catch(err => console.log(err))
    }, [isRender])

    useEffect(() => {
        getAllCategory()
            .then(res => setCategory(res.data))
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        getAvatar()
            .then(res => setAvatar(res.data))
            .catch(err => console.log(err))
    }, [])

    const openNotification = () => {
        notification.open({
            message: 'B???n ch??a ????ng nh???p',
            description:
                'H??y ????ng nh???p ????? c?? th??? ????ng nh???ng b??i vi???t th???t hay nh?? :) ',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    const handleLike = (id) => {
        likeByUser(id)
            .then(() => {
                getAllPostByUser()
                    .then(res => setPosts(res.data.reverse()))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const handleDeletePost = (id) => {
        deletePost(id)
            .then(setIsRender(!isRender))
            .then(() => notification["success"]({
                message: "X??a b??i th??nh c??ng",
                placement: "topRight",
            }))
            .catch()
    }
    const showModal = () => {
        props.isLogin == true ? setIsModalVisible(true) : openNotification()
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const showModalEditAvatar = () => {
        props.isLogin == true ? setIsModalVisibleEditAvatar(true) : openNotification()
    };
    const handleOkEditAvatar = () => {
        editAvatar(avatarEdit)
            .then(() => getAvatar()
                .then(res => setAvatar(res.data))
                .catch(err => console.log(err)))
            .then(() => notification["success"]({
                message: "S???a avatar th??nh c??ng",
                placement: "topRight",
            }))
            .catch(() => notification["error"]({
                message: "S???a avatar th???t b???i",
                placement: "topRight",
            }))
        setIsModalVisibleEditAvatar(false);
    };

    const handleCancelEditAvatar = () => {
        setIsModalVisibleEditAvatar(false);
    };
    return (
        <div>

            <Content style={{ margin: '0 16px' }}>
                <div style={{ marginBottom: "20px" }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Profile</Breadcrumb.Item>
                    </Breadcrumb>
                    <Button onClick={showModal} type="primary" shape="round" icon={<PlusOutlined />} size={"small"}>
                        Th??m b??i vi???t
                    </Button>
                    <ModalProfile setPosts={(data) => setPosts(data)} category={category} isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
                </div>
                <div className="site-layout-background" style={{ backgroundColor: "rgb(249, 255, 240)", padding: 24, minHeight: 360 }}>
                    <div style={{ textAlign: "right", }}>
                        <Button onClick={showModalEditAvatar} >?????i Avatar</Button>
                        <Modal title="Edit Avatar" visible={isModalVisibleEditAvatar} onOk={handleOkEditAvatar} onCancel={handleCancelEditAvatar}>
                            <p>Nh???p link 1 c??i ???nh th???t ?????p v??o ????y :)))</p>
                            <Input placeholder="Image" onChange={(e) => setAvatarEdit(e.target.value)} />
                        </Modal>
                        <Link to="/changepassword"><Button >?????i m???t kh???u</Button></Link>
                    </div>
                    <div style={{ display: 'flex', justifyContent: "space-around", textAlign: 'center' }}>
                        <Avatar style={{ background: "white" }} size={300} src={avatar} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: "space-around", textAlign: 'center' }}>
                        <Title>{localStorage.getItem('username')}</Title>
                    </div>
                </div>
                <Text strong type="success"> Nh???ng b??i vi???t ???? ????ng</Text>

                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

                    {/* Hi???n ra list blog  */}
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={posts}

                        renderItem={item => (

                            <List.Item
                                key={item.title}
                                actions={[
                                    <div style={{ cursor: "pointer" }} onClick={() => handleLike(item.id)}>
                                        <IconText icon={LikeOutlined} text={item.numLike} key="list-vertical-like-o" />
                                    </div>,
                                    <IconText icon={MessageOutlined} text={item.numComment} key="list-vertical-message" />,
                                    <Button onClick={() => handleDeletePost(item.id)}>X??a</Button>,

                                ]}
                                extra={
                                    <img
                                        width={272}
                                        height={170}
                                        alt="logo"
                                        src={item.thumnail}
                                    />
                                }
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={avatar} />}
                                    title={(props.isLogin == true) ?
                                        <Link to={"/blog/" + item.id}>{item.title}</Link> :
                                        <Link to={"/login"}>{item.title}</Link>
                                    }

                                    description={"T??c gi???: " + item.username}

                                />
                                {item.description}

                            </List.Item>
                        )}
                    />
                </div>
                <FooterCom />
            </Content>
        </div>
    )
}

export default ContentProfile
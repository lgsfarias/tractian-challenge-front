import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import {MdLocationOn} from 'react-icons/md';
import {TbBuildingFactory2} from 'react-icons/tb';
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import {MenuProps } from 'antd';
import {Menu } from 'antd';


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

export default function SideMenu(){
  const {token} = useAuth();
  const naigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  const companyItems: MenuItem[] = [...companies.map((company: any) => {
    return getItem(company.name, company._id, <MdLocationOn />)}), 
    getItem('Nova Empresa', 'NewCompany', <PieChartOutlined />)];

  const items: MenuItem[] = [
    getItem("Home", "Home", <DesktopOutlined />),
    getItem("Companies", "Companies", <TbBuildingFactory2 />, companyItems),
  ];

  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get('/users/show-data', config);
      setCompanies(response.data.companies);
    })();
  }, []);

  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={
      (e) => {
      if (e.key === "Home") {
        naigate('/home');
        return;
      }
      if (e.keyPath[e.keyPath.length - 1] === "Companies") {
        if (e.key === 'NewCompany'){
          console.log('new company');
          return;
        }
        naigate(`/companies/${e.key}`);
        return;
      }
    }
    }/>
  );
}
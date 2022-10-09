import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCompany from '../../hooks/useCompany';
import {Asset,Unit,Employee} from '../../interfaces';
import {MdLocationOn} from 'react-icons/md';
import {TbBuildingFactory2} from 'react-icons/tb';
import {VscGear} from 'react-icons/vsc';
import {
  DashboardOutlined,
  UserOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';
import {MenuProps } from 'antd';
import {Menu } from 'antd';


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

export default function SideMenu(){
  const naigate = useNavigate();
  const {units, employees, assets} = useCompany();

  const unitItems: MenuItem[] = [...units.map((unit: Unit) => {
    return getItem(unit.name, unit._id, <MdLocationOn />);
  }), 
  getItem('New Unit', 'add-unit', <PlusSquareOutlined />)];

  const employeeItems: MenuItem[] = [...employees.map((employee: Employee) => {
    return getItem(employee.name, employee._id, <UserOutlined />);
  }),
  getItem('New Employee', 'add-employee', <PlusSquareOutlined />)];

  const assetItems: MenuItem[] = [...units.map((unit: Unit) => {
    return getItem(unit.name, unit._id, null,[
      ...assets.filter((asset: Asset) => asset.unit._id === unit._id).map((asset: Asset) => {
        return getItem(asset.name, asset._id, <VscGear />);
          }),
        ], 'group'
      );
    }),
    getItem('New Asset', 'add-asset', <PlusSquareOutlined />),
  ];

  const items: MenuItem[] = [
    getItem("Dashboard", "Home", <DashboardOutlined />),
    getItem("Units", "Units", <TbBuildingFactory2 />, unitItems),
    getItem("Employees", "Employees", <UserOutlined />, employeeItems),
    getItem("Assets", "Assets", <VscGear />, assetItems),

  ];

  return (
    <Menu 
    theme="dark" 
    defaultSelectedKeys={['Home']} 
    mode="inline" 
    items={items} 
    onClick={
      (e) => {
      if (e.key === "Home") {
        naigate('/home');
        return;
      }
      if (e.keyPath[e.keyPath.length - 1] === "Units") {
        if (e.key === 'add-unit'){
          naigate('/units/new');
          return;
        }
        naigate(`/units/${e.key}`);
        return;
      }
      if (e.keyPath[e.keyPath.length - 1] === "Employees") {
        if (e.key === 'add-employee'){
          naigate('/employees/new');
          return;
        }
        naigate(`/employees/${e.key}`);
        return;
      }
      if (e.keyPath[e.keyPath.length - 1] === "Assets") {
        if (e.key === 'add-asset'){
          naigate('/assets/new');
          return;
        }
        naigate(`/assets/${e.key}`);
        return;
      }
    }
    }/>
  );
}
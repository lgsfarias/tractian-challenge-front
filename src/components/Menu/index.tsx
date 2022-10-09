import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCompany from '../../hooks/useCompany';
import {MdLocationOn} from 'react-icons/md';
import {TbBuildingFactory2} from 'react-icons/tb';
import {
  DashboardOutlined,
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
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

export default function SideMenu(){
  const naigate = useNavigate();
  const {units, employees} = useCompany();

  const unitItems: MenuItem[] = [...units.map((unit: any) => {
    return getItem(unit.name, unit._id, <MdLocationOn />);
  }), 
  getItem('New Unit', 'add-unit', <PlusSquareOutlined />)];

  const employeeItems: MenuItem[] = [...employees.map((employee: any) => {
    return getItem(employee.name, employee._id, <TbBuildingFactory2 />);
  }),
  getItem('New Employee', 'add-employee', <PlusSquareOutlined />)];

  const items: MenuItem[] = [
    getItem("Dashboard", "Home", <DashboardOutlined />),
    getItem("Units", "Units", <TbBuildingFactory2 />, unitItems),
    getItem("Employees", "Employees", <TbBuildingFactory2 />, employeeItems),
    getItem("Assets", "Assets", <TbBuildingFactory2 />,[
      getItem("Unit 1", "sub1", <MdLocationOn />,[
        getItem("Asset 1", "Asset1", <MdLocationOn />),
        getItem("Asset 2", "Asset2", <MdLocationOn />),
        getItem("Asset 3", "Asset3", <MdLocationOn />),
      ]),
      getItem("Unit 2", "sub2", <MdLocationOn />,[
        getItem("Asset 4", "Asset4", <MdLocationOn />),
        getItem("Asset 5", "Asset5", <MdLocationOn />),
        getItem("Asset 6", "Asset6", <MdLocationOn />),
      ]),
      getItem("Unit 3", "sub3", <MdLocationOn />,[
        getItem("Asset 7", "Asset7", <MdLocationOn />),
        getItem("Asset 8", "Asset8", <MdLocationOn />),
        getItem("Asset 9", "Asset9", <MdLocationOn />),
      ]),
      getItem("New Asset", "NewAsset", <PlusSquareOutlined />),
    ]),
    getItem("All Assets", "All Assets", <TbBuildingFactory2 />),
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
    }
    }/>
  );
}
import api from "../../services/api"
import useAuth from "../../hooks/useAuth"
import useCompany from "../../hooks/useCompany"
import { useEffect, useState } from "react"
import { User } from "../../interfaces"
import { Typography , Col, Row, Space} from "antd"
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import drilldown from 'highcharts/modules/drilldown';

const { Title } = Typography

export default function Home() {
  const { token } = useAuth()
  const [user, setUser] = useState<User>();
  const { employees, units,assets ,updateAssets,updateEmployees,updateUnits} = useCompany();

  drilldown(Highcharts);
  const allAssetsOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'All Assets'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      allowDecimals: false,
      title: {
        text: 'total assets',
      },
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: 'Total Assets',
        colorByPoint: true,
        data: [
          {
            name: 'Running',
            y: assets.filter(asset => asset.status === 'Running').length,
            color: '#52c41a',
            drilldown: 'Running'
          },
          {
            name: 'Alerting',
            y: assets.filter(asset => asset.status === 'Alerting').length,
            color: '#faad14',
            drilldown: 'Alerting'
          },
          {
            name: 'Stopped',
            y: assets.filter(asset => asset.status === 'Stopped').length,
            color: '#f5222d',
            drilldown: 'Stopped'
          },
        ]
      }
    ],
    drilldown: {
      series: [
        {
          name: 'Health Level',
          id: 'Running',
          data: assets.filter(asset => asset.status === 'Running').map(asset => [asset.name, asset.healthLevel])
        },
        {
          name: 'Health Level',
          id: 'Alerting',
          data: assets.filter(asset => asset.status === 'Alerting').map(asset => [asset.name, asset.healthLevel])
        },
        {
          name: 'Health Level',
          id: 'Stopped',
          data: assets.filter(asset => asset.status === 'Stopped').map(asset => [asset.name, asset.healthLevel])
        },
      ]
    }
  }

  const assetsHealthOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Assets Health'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Health Level'
      },
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: 'Health Level',
        colorByPoint: true,
        data: [...assets.map(asset => {
          return {
            name: asset.name,
            y: asset.healthLevel,
            color: asset.status === 'Running' ? '#52c41a' : asset.status === 'Alerting' ? '#faad14' : '#f5222d',
          }
        }),
        {
          name: 'Average',
          y: assets.reduce((acc, asset) => acc + asset.healthLevel, 0) / assets.length,
          color: '#1890ff'
        }]
      }
    ]
  }

  const pieOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
        text: 'Assets by Status'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %<br> Total: {point.y}'
            }
        }
    },
    series: [{
        name: 'Assets',
        colorByPoint: true,
        data: [{
            name: 'Running',
            y: assets.filter(asset => asset.status === 'Running').length,
            sliced: true,
            selected: true,
            color: '#52c41a'
        }, {
            name: 'Alerting',
            y: assets.filter(asset => asset.status === 'Alerting').length,
            color: '#faad14'
        },  {
            name: 'Stopped',
            y: assets.filter(asset => asset.status === 'Stopped').length,
            color: '#f5222d'
        }]
    }]
  }

  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get('/users/show-data', config);
      await updateEmployees();
      await updateUnits();
      await updateAssets();
      setUser(response.data);
    })();
  }, []);


  return (
    user ? 
    (<>
      <Space direction="vertical" style={{width: '100%'}}>
      <Title level={2}>Welcome {user.name}</Title>
      <h2>Company: {user.company.name}</h2>
      <h2>Units: {units.length}</h2>
      <h2>Employees: {employees.length}</h2>
      <h2>Assets: {assets.length}</h2>
      <Row>
        <Col span={24}>
          <HighchartsReact
            highcharts={Highcharts}
            options={assetsHealthOptions}
          />
        </Col>
      </Row>
      <Row 
        gutter={[16, 16]}
      >
        <Col 
          span={12}
        >
          <HighchartsReact
            highcharts={Highcharts}
            options={allAssetsOptions}
          />
        </Col>
        <Col
          span={12}
        >
          <HighchartsReact 
            highcharts={Highcharts}
            options={pieOptions}
          />
        </Col>
      </Row>
      </Space>
    </>) : <h1>Loading...</h1>

  )
}
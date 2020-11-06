import React, { useEffect, useState } from 'react'
import Tables from '../../components/Tables1'
import Box from '../../components/box'
import { Breadcrumb, Button, Input, Modal, Popover, Skeleton, Tree, Typography } from 'antd'
import {
  PlusCircleOutlined,
  EditOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router'
import network from '../../utils/network'
const { Text } = Typography
const DepsList = () => {
  const title = '部门结构'
  const router = useRouter()
  const [orgs, setOrgs] = useState([])
  useEffect(() => {
    getList()
  }, [])
  // 获取列表数据
  const getList = () => {
    network('GET', `/orgs/`, null, (res) => {
      setOrgs(res.structure)
    })
  }
  // 修改文本
  const saveOrgs = () => {
    network('PUT', `/orgs/`, { structure: orgs }, (res) => {
      console.log(res);
    })
  }
  const loop = (data, key, callback) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === key) {
        return callback(data[i], i, data);
      }
      if (data[i].children) {
        loop(data[i].children, key, callback);
      }
    }
  };
  // 拖拽
  const onDrop = (info) => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const data = [...orgs];
    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setOrgs(data)
  }


  // 添加修改
  const [val, setVal] = useState({
    key: '',
    name: ''
  })
  const [newVal, setNewVal] = useState({
    key: '',
    name: ''
  })
  const [type, setType] = useState('add')
  const [visible, setVisible] = useState(false)
  // 弹窗
  const changeArr = (visible, val, type) => {
    setVal(val)
    setType(type)
    setVisible(visible)
  }
  const renderTitle = (e) => {
    return <>
      <Popover placement="right" content={<>
        <Button type='link' onClick={() => changeArr(true, e, 'edit')}><EditOutlined />编辑</Button>
        <Button type='link' onClick={() => changeArr(true, e, 'add')}><PlusCircleOutlined />添加</Button>
      </>} trigger="hover">
        {e.name}
      </Popover>
    </>
  }
  // 修改Val
  const changeVal = (v, t) => {
    if (type === 'add') {
      setNewVal({ ...newVal, [t]: v })
    } else {
      setVal({ ...val, [t]: v })
    }
  }
  // 修改Orgs
  const changeItem = () => {
    const data = [...orgs]
    let dropKey = val.key
    if (type === 'edit') {
      loop(data, dropKey, item => {
        item.key = genID()
        item.name = val.name
      });
      setOrgs(data)
      setVisible(false)
      setVal({ key: '', name: '' })
    } else {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        let v = { ...newVal, key: genID() }
        item.children.push(v);
      });
      setOrgs(data)
      setVisible(false)
      setNewVal({ key: '', name: '' })
    }
  }
  // 生成随机id
  const genID = () => {
    return Number(Math.random().toString().substr(3, 10)).toString(36) + Date.now();
  }
  const renerModal = () => {
    return (
      <Modal
        title='添加/修改'
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={changeItem}>
        <Input
          value={type === 'edit' ? val.name : newVal.name}
          onChange={(e) => changeVal(e.target.value, 'name')}
          placeholder='请输入名称' />
      </Modal>
    )
  }
  return (
    <Box title={title}>
      <Breadcrumb>
        <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
      </Breadcrumb>
      {renerModal()}
      {orgs.length ? <Tree
        treeData={orgs}
        showLine
        draggable
        onDrop={onDrop}
        titleRender={renderTitle}
        defaultExpandAll /> : <Skeleton></Skeleton>}
      <Button onClick={saveOrgs}>保存</Button>
    </Box>
  )
}
export default DepsList

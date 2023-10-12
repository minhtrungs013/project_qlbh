import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Folder from '../../shared/Folder/Folder'
import { getAllData, getDataById } from '../../../api/service/api'
import { Button, Col, Row } from 'antd'
import Lession from './Lession'
import { BackwardOutlined } from '@ant-design/icons'

const IndexLession = props => {
    const [dataPractice, setDataPractice] = useState([])
    const [dataPart, setDataPart] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [ isLoading, setIsLoading ] = useState(false)
    const [ selected, setSeleceted ] = useState(false)
    const [ selectedPart, setSelecetedPart ] = useState(false)
    const [ practiceId, setPracticeId ] = useState('')
    const [ practicePartId, setPracticePartId ] = useState('')

    const getDataPractice = () => {
        setIsLoading(true)
        getAllData('practices').then((res) => {
            setDataPractice(res.data.data)
            setIsLoading(false)
        })
    }

    const handleSelected = (value) => {
        setSeleceted(true)
        setPracticeId(value.id)
    }
    const handleSelectedPart = (value) => {
        setSelecetedPart(true)
        setPracticePartId(value.id)
    }

    const getDataPartOfPractice = useCallback(() => {
        if(practiceId){
            setIsLoading(true)
            getDataById(`practiceParts?practiceId=${practiceId}`).then((res) => {
            setDataPart(res.data.data)
            setIsLoading(false)
    })
        }
    },[practiceId])

    useEffect(() => {
        getDataPractice()
        getDataPartOfPractice()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [practiceId])

    const buttonBack = useMemo(() => {
        return <Button onClick={getDataPractice} icon={<BackwardOutlined />}></Button>    
    }, [])
    

  return (
    <div>
        {
            !selected ? <Row gutter={100} mt={10} style={{margin: "20px"}}>
            {dataPractice?.map((item) => (
                <Col span={4} key={item.id}>
                    <Folder lableName={item.name} onSelect={() => handleSelected(item)} />
                </Col>
            ))}                   
        </Row> : !selectedPart ? <Row gutter={100} mt={10} style={{margin: "20px"}}>
            {buttonBack}
            {dataPart?.map((itemPart) => (
                <Col span={4} key={itemPart.id}>
                    <Folder lableName={itemPart.name} onSelect={() => handleSelectedPart(itemPart)} />
                </Col>
            ))}                   
        </Row> : <Lession practicePartId={practicePartId}/> 
        }
    </div>
  )
}

IndexLession.propTypes = {}

export default IndexLession
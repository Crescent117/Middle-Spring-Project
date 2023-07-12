import React from 'react'
import { Container, Row } from 'react-bootstrap'
import MyNavbar from '../components/Selected/MyNavBar'
import SelectedBody from '../components/Selected/SelectedBody'

const SelectedMyPage = () => {
  return (
    <Container>
      <Row>
        <MyNavbar />
        <SelectedBody />
      </Row>
    </Container>
  )
}

export default SelectedMyPage
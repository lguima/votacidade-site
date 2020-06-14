import React, { useState } from 'react'

import { Container, Row, Col, Form, FormGroup, Label, Input as ReactstrapInput } from 'reactstrap'

import { Button } from '../components/Button'
import { isEmailValid, isRequiredField } from '../utils/helper'
import { Title } from '../components/Title'
import { Input } from '../components/Input'

const validators = (name, value, errors) => {
  const required = isRequiredField(value)
  switch (name) {
    case 'EMAIL':
      if (required) {
        return { ...errors, EMAIL: required }
      }

      if (!isEmailValid(value)) {
        return { ...errors, EMAIL: 'Digita um e-mail válido' }
      }

      delete errors.EMAIL
      break;

    case 'CIDADE':
      if (required) {
        return { ...errors, CIDADE: required }
      }

      delete errors.CIDADE
      break;

    default:
      return errors;
  }
}

export const CTAEmail = ({ title, subtitle }) => {
  const [diry, setDirty] = useState(false);
  const [errors, setErrors] = useState({});
  const [contactInfo, setContactInfo] = useState({
    EMAIL: '',
    CIDADE: '',
    CANDIDATO: false,
  });

  console.log("Cheguei no formulário.");
  console.log("[CTAEmail:", contactInfo);

  const setInfo = (el) => {
    const { name, value, type } = el.target;

    if (diry) {
      const newErrors = validators(name, value, errors) || { [name]: '' }
      setErrors({ ...errors, ...newErrors })
    }

    const newValue = (type === 'checkbox') ? !contactInfo[name] : value;
    setContactInfo({ ...contactInfo, [name]: newValue })
    console.log("Depois de passar pelo onChange: ",contactInfo);
  }

  const submit = (event) => {
    const formErrors = Object
      .keys(contactInfo)
      .map(infoKey => validators(infoKey, contactInfo[infoKey], errors))
      .reduce((acc, erro) => ({ ...acc, ...erro }))

    setErrors(formErrors);
    if (formErrors) {
      setDirty(true);
    }

    if (Object.keys(formErrors).length === 0) {
      return true
    }

    event.preventDefault();
  }

  return (
    <Container>
      <Row>
        <Col lg={{ size: 8, offset: 2 }} className="text-center mt-5 mb-4">
          {title && <Title tag="h1" weight="800" size="2.5rem">{title}</Title>}
          {subtitle && <Title tag="h3" color="#959595" className="h4">{subtitle}</Title>}
        </Col>
        <Col lg={{ size: 10, offset: 1 }}>
          <Form target="_blank" method="POST" action="" onSubmit={submit}>
            <Row form>
              <Col lg="5">
                <Input
                  errors={errors}
                  invalid={!!errors.EMAIL}
                  onChange={setInfo}
                  type="mail"
                  name="EMAIL"
                  placeholder="Digite seu e-mail"
                  bsSize="lg"
                />
              </Col>
              <Col lg="4">
                <Input 
                  errors={errors}
                  invalid={!!errors.CIDADE}
                  onChange={setInfo}
                  type="select"
                  name="CIDADE"
                  bsSize="lg"
                >
                  <option value="">Selecione sua cidade</option>
                  <option>Campina Grande</option>
                  <option>Campinas</option>
                  <option>João Pessoa</option>
                  <option>Porto Alegre</option>
                  <option>Recife</option>
                </Input>
              </Col>
              <Col lg="3">
                <Button block size="lg" color="secondaryColor" name="subscribe" type="submit">ENVIAR</Button>
              </Col>
              <Col>
                <FormGroup check>
                  <ReactstrapInput style={{
                    transform: 'scale(1.7) translateY(-2px)',
                    transformOrigin: 'left'
                  }} name="CANDIDATO" type="checkbox" onChange={setInfo} id="candidato" />{' '}
                  <Label check for="candidato" className="ml-3">
                    Sou pré-candidato e gostaria de receber mais informações
                  </Label>
                </FormGroup>
                <ReactstrapInput type="hidden" name="b_6f198f953b0c34ee391e4e8bf_e7126f8c48" tabIndex="-1" value="" />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
import React from 'react';
import { Link } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import StepLabel from '@mui/material/StepLabel';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import Box from '@mui/material/Box';

import InputField from 'components/InputForm/InputFields';
import { DateSelector } from 'components/InputForm/DateSelector';
import { UserSelector } from 'components/InputForm/UserSelector';
import { ItemSelector } from 'components/InputForm/ItemSelector';
import { PriceDisplay } from '../PriceDisplay';
import BillFormProps, { Steps } from './props';

export const BillForm = (props: BillFormProps) => {
  const { title, inputs, fields, set, submit, cancel } = props;

  const steps: Steps[] = fields.map((f) => {
    switch (f.type) {
      case 'date':
        return {
          label: 'Choose the timeframe',
          element: <DateSelector start={f.dates.start} end={f.dates.end} set={set} />
        };
      case 'price':
        return {
          label: 'Set the price',
          element: <PriceDisplay price={inputs['price']} set={set('price')} disabled={f.disabled} />
        };
      case 'users':
        return {
          label: f.menu_label,
          element: (
            <UserSelector
              name={f.name}
              label={f.label}
              users={inputs['users']}
              setUsers={set('users')}
              err={f.err}
            />
          )
        };
      case 'items':
        return {
          label: f.menu_label,
          element: (
            <ItemSelector
              name={f.name}
              label={f.label}
              items={inputs['items']}
              setItems={set('items')}
              users={inputs['users']}
              err={f.err}
            />
          )
        };
      default:
        return {
          label: f.menu_label,
          element: (
            <InputField
              name={f.name}
              label={f.label}
              type={f.type}
              inputs={inputs[f.name]}
              set={set(f.name)}
              err={f.err}
            />
          )
        };
    }
  });

  const [activeStep, setActiveStep] = React.useState(0);

  const handle_next = () => setActiveStep((prev) => prev + 1);

  const handle_back = () => setActiveStep((prev) => prev - 1);

  return (
<<<<<<< HEAD
    <Box sx={{ width: '100%', paddingTop: '10px' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Container component="main" maxWidth="xs" style={{ textAlign: 'center', paddingTop: '15px' }}>
        <LockOutlinedIcon />
        {steps[activeStep].label}
        {steps[activeStep].element}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          {activeStep === 0 ? (
            <Link to={cancel.href} style={{ textDecoration: 'none' }}>
              <Button>Cancel</Button>
=======
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            {/* onSubmit={submit.func} */}
            {fields.map((field, idx) => {
              switch (field.type) {
                case 'date':
                  return (
                    <DateSelector
                      key={`date-${idx}`}
                      start={field.dates.start}
                      end={field.dates.end}
                      set={set}
                    />
                  );
                case 'span':
                  return (
                    <Alert key={`alert-${idx}`} severity="info">
                      {field.content}
                    </Alert>
                  );
                case 'users':
                  return (
                    <UserSelector
                      key={`user-${idx}`}
                      // TODO: fix this form up
                      setSelectedUsers={(val) => {
                        console.log(val);
                      }}
                    />
                  );
                case 'items':
                  return (
                    <ItemSelector
                      key={`user-${idx}`}
                      name={field.name}
                      label={field.label}
                      inputs={inputs}
                      set={set}
                      err={field.err}
                    />
                  );
                case 'price':
                  return (
                    <PriceDisplay
                      key={`price-${idx}`}
                      price={inputs.price}
                      set={set('price')}
                      disabled={field.disabled}
                    />
                  );
                default:
                  return (
                    <InputField
                      key={`text-${idx}`}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      inputs={inputs}
                      set={set}
                      err={field.err}
                    />
                  );
              }
            })}
            <Link
              key={`submit-${title}`}
              to={submit.href}
              onClick={submit?.func}
              style={{ textDecoration: 'none' }}
            >
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
                Confirm
              </Button>
>>>>>>> main
            </Link>
          ) : (
            <Button onClick={handle_back} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep === steps.length - 1 ? (
            <Link to={submit.href} onClick={submit?.func} style={{ textDecoration: 'none' }}>
              <Button>Submit</Button>
            </Link>
          ) : (
            <Button onClick={handle_next}>Next</Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

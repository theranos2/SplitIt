import { Link } from 'react-router-dom';

import InputField from 'components/InputForm/InputFields';
import { DateSelector } from 'components/InputForm/DateSelector';
import { UserSelector } from 'components/InputForm/UserSelector';
import { ItemSelector } from 'components/InputForm/ItemSelector';
import { PriceDisplay } from '../PriceDisplay';
import BillFormProps from './props';

import BillStepper from '../Stepper';

export const BillForm = (props: BillFormProps) => {
  const { title, inputs, fields, set, submit, cancel } = props;

  const steps = fields.map((field, idx) => {
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
            name={field.name}
            label={field.label}
            users={inputs['users']}
            setUsers={set('users')}
            err={field.err}
          />
        );
      case 'items':
        return (
          <ItemSelector
            key={`user-${idx}`}
            name={field.name}
            label={field.label}
            items={inputs['items']}
            setItems={set('items')}
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
            inputs={inputs[field.name]}
            set={set(field.name)}
            err={field.err}
          />
        );
    }
  });

  return <BillStepper steps={steps} submit={submit} cancel={cancel} />;
}; // based on: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in

{/* <LockOutlinedIcon /> */}

import BillFormProps from './props';
import FormSteps from 'components/Core/FormSteps';

export const BillForm = (props: BillFormProps) => {
  return <FormSteps {...props} />;
};

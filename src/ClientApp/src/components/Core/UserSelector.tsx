import { Autocomplete, Chip, TextField } from '@mui/material';
import { UserInfoDto } from 'api';

export type UserSelectorProps = {
  /** pass in setter from useState */
  onChange: (values: UserInfoDto[]) => void;
  /** preferrably from useState */
  values: UserInfoDto[];
  /** list of users to choose from */
  options: UserInfoDto[];
  /**
   * IMPORTANT: pass a reference from `values`
   * If given, this user cannot be removed from the selection
   */
  fixedUser?: UserInfoDto;
};

export const UserSelector = (props: UserSelectorProps) => {
  const { values, options, fixedUser, onChange } = props;

  const makeLabel = (user: UserInfoDto) =>
    fixedUser && fixedUser.id === user.id
      ? `${user.firstName} ${user.lastName} (You)`
      : `${user.firstName} ${user.lastName}`;

  const onChangeStrategy = () => {
    if (fixedUser) {
      return (value: UserInfoDto[]) => {
        onChange([fixedUser, ...value.filter((u) => u.id !== fixedUser.id)]);
      };
    } else {
      return (value: UserInfoDto[]) => {
        onChange(value);
      };
    }
  };
  return (
    <Autocomplete
      multiple
      filterSelectedOptions
      onChange={(_, value) => onChangeStrategy()(value)}
      value={values}
      options={options}
      getOptionLabel={makeLabel}
      renderInput={(params) => <TextField {...params} label="Members" />}
      renderTags={(values, getProps) =>
        values.map((option, index) => (
          <Chip
            label={makeLabel(option)}
            {...getProps({ index })}
            disabled={fixedUser ? option.id === fixedUser.id : false}
          />
        ))
      }
    />
  );
};

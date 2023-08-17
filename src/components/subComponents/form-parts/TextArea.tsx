import { FC, SyntheticEvent } from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
  UseFormResetField,
} from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';

interface TextAreaProps {
  id: string;
  label: string;
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  isDirty: boolean;
  register: UseFormRegister<FieldValues>;
  resetField: UseFormResetField<FieldValues>;
}

const TextArea: FC<TextAreaProps> = ({
  id,
  label,
  errors,
  isDirty,
  register,
  resetField,
}) => {
  const handleReset = (e: SyntheticEvent) => {
    if ((e.target as HTMLInputElement).value !== '') return;
    resetField(id, { defaultValue: '', keepDirty: false });
  };
  return (
    <div className="relative flex flex-col justify-center w-full gap-y-[2px]">
      <div className="flex items-center relative w-full">
        <textarea
          rows={5}
          className={`${isDirty ? 'is-dirty' : ''} ${
            errors ? 'has-error' : ''
          } bg-transparent resize-none w-full border-[1px] rounded-[5px] px-[15px] py-2 focus:outline-0 peer [&.has-error]:border-red-600 `}
          id={id}
          {...register(id, { onChange: handleReset })}
        />
        <label
          className="absolute left-[15px] top-[0.5rem] transition-[font-size,transform,background-color] leading-none text-base dark:bg-zinc-900 bg-zinc-50
                    peer-hover:-translate-y-full  peer-focus:-translate-y-full peer-[.is-dirty]:-translate-y-full
                    peer-hover:text-sm peer-focus:text-sm peer-[.is-dirty]:text-sm peer-[.has-error]:text-red-600"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
      <FormErrorMessage errors={errors} />
    </div>
  );
};

export default TextArea;

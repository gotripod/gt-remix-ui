import { Link } from '@remix-run/react'

import Column from './column'
import type { DivProps, InputProps, LabelProps, TextAreaProps } from 'react-html-props'
import classNames from 'classnames'
import { Button } from './button'

const Field = (props: DivProps) => (
  <div {...props} className={classNames('w-full', props.className)}>
    {props.children}
  </div>
)

const Input = (props: InputProps) => (
  <input {...props} className={classNames('w-full p-4 text-lg text-white bg-white/30 border-0')} />
)
const TextArea = (props: TextAreaProps) => (
  <textarea
    {...props}
    className={classNames('w-full p-4 text-lg text-white bg-white/30 border-0')}
  />
)

const Label = (props: LabelProps) => (
  <label {...props} className={classNames('font-bold block text-left', props.className)}>
    {props.children}
  </label>
)

const Contact = () => (
  <Column>
    <div className="bg-gradient-to-r from-[#4291ce] to-[#6ba9d9] text-[#ededed] text-center my-8 py-8 md:my-16 md:py-24">
      <h1 className="font-bold text-4xl">Got an idea for a project?</h1>

      <p className="mx-8 my-8 md:my-0 md:mx-0">
        Need a website? Web-enabled software to streamline your business? Just some advice?
      </p>

      <form acceptCharset="UTF-8" action="https://usebasin.com/f/608feeaf0fac" method="POST">
        <fieldset>
          <div className="grid md:grid-cols-2 gap-8 px-8 md:px-24 md:py-12">
            <div className="flex justify-stretch">
              <Field>
                <Label className="mb-4 md:mb-0" htmlFor="message">
                  Message*
                </Label>
                <TextArea id="message" name="message" rows={9} required></TextArea>
              </Field>
            </div>
            <div className="flex justify-stretch items-stretch flex-col gap-8">
              <Field>
                <Label className="mb-4 md:mb-0" htmlFor="name">
                  Name
                </Label>
                <Input type="text" id="name" name="name" />
              </Field>

              <Field>
                <Label className="mb-4 md:mb-0" htmlFor="email">
                  Email*
                </Label>
                <Input type="email" id="email" name="email" required />
              </Field>

              <Field className="flex gap-4 items-start">
                <input
                  type="checkbox"
                  id="contact-permission"
                  name="contact-permission"
                  value="Granted"
                  required
                  className="h-[40px] w-[40px] bg-white/30 border-0"
                />
                <Label
                  className="text-lg font-normal flex-1 -mt-[8px]"
                  htmlFor="contact-permission">
                  Please get back to me ASAP and treat my details with respect in line with your{' '}
                  <Link className="underline" to="/privacy-policy">
                    privacy policy
                  </Link>
                  .
                </Label>
              </Field>
            </div>
          </div>

          <input type="hidden" name="source" value="https://gotripod.com" />
          <Button className="!bg-neutral-500 mt-8 md:mt-0" type="submit">
            Send it
          </Button>
        </fieldset>
      </form>
    </div>
  </Column>
)

export default Contact
// const SButton = styled(Button)`
//   background: #666;
//   font-size: 18px;
// `

// const Wrapper = styled.section`
//   color: #ededed;
//   text-align: center;
//   background: linear-gradient(to right, #4291ce, #6ba9d9);
//   padding: ${px2rem(Theme.gutter * 4)} ${px2rem(Theme.gutter * 8)};
//   margin-bottom: ${px2rem(Theme.gutter * 6)};

//   p {
//     margin-bottom: ${px2rem(Theme.gutter * 3)};
//   }

//   h1 {
//     font-size: 2rem;
//     margin-top: 0;
//   }

//   fieldset {
//     border: 0;
//     padding: 0;
//   }

//   ${mqLess(breakpoints.medium)} {
//     padding: ${px2rem(Theme.gutter * 4)} ${px2rem(Theme.gutter)};
//     margin-bottom: ${px2rem(Theme.gutter * 2)};
//   }
// `

// const Field = styled.div`
//   text-align: left;
//   margin-bottom: ${Theme.gutter * 2}px;

//   &.checkbox {
//     display: flex;
//     position: relative;
//     cursor: pointer;
//   }

//   &.checkbox input {
//     width: auto;
//     opacity: 0;
//     position: absolute;
//   }

//   &.checkbox input:checked + label:after {
//     content: '';
//   }

//   &.checkbox label {
//     width: 100%;
//     padding-left: 50px;
//     position: relative;
//   }

//   &.checkbox label:before {
//     content: '';
//     background-color: rgba(255, 255, 255, 0.3);
//     position: absolute;
//     top: 0;
//     width: 40px;
//     height: 40px;
//     left: 0;
//   }

//   &.checkbox label:after {
//     position: absolute;
//     top: 6px;
//     left: 3px;
//     height: 11px;
//     width: 36px;
//     border-left: 6px solid;
//     border-bottom: 6px solid;
//     transform: rotate(-45deg);
//   }
// `

// const InputStyle = css`
//   color: #ededed;
//   background-color: rgba(255, 255, 255, 0.3);
//   width: 100%;
//   font-size: 100%;
//   resize: none;
//   border: 0;
//   vertical-align: top;
//   padding: ${Theme.gutter}px;
//   transition: background-color 0.1s cubic-bezier(0.4, 0, 0.2, 1);
//   box-sizing: border-box;
// `

// const Input = styled.input`
//   ${InputStyle}
// `
// const TextArea = styled.textarea`
//   ${InputStyle}
// `

// const Label = styled.label`
//   margin-bottom: ${Theme.gutter}px;
//   display: inline-block;
//   font-weight: bold;

//   a {
//     text-decoration: underline;
//   }
// `

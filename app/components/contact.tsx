import { Link } from '@remix-run/react'

import { Button } from './button'
import Column from './column'
import { DivProps, InputProps, LabelProps, TextAreaProps } from 'react-html-props'
import classNames from 'classnames'

const Field = (props: DivProps) => (
  <div {...props} className={classNames('', props.className)}>{props.children}</div>
)

const Input = (props: InputProps) => (<input {...props} className={classNames('p-4 text-lg text-white bg-white/30')} />)
const TextArea = (props: TextAreaProps) => (<textarea {...props} className={classNames('p-4 text-lg text-white bg-white/30')} />)


const Wrapper = (props: DivProps) => (
  <div {...props}>{props.children}</div>
)


const Label = (props: LabelProps) => (
  <label {...props} className='block text-left'>{props.children}</label>
)

const GridContainer = (props: DivProps) => (
  <div {...props}>{props.children}</div>
)

const Contact = () => (
  <Column>
    <div className='bg-gradient-to-r from-[#4291ce] to-[#6ba9d9] text-[#ededed] text-center my-16'>
      <h1 className='font-bold text-3xl'>Got an idea for a project?</h1>

      <p>Need a website? Web-enabled software to streamline your business? Just some advice?</p>

      <form acceptCharset="UTF-8" action="https://usebasin.com/f/608feeaf0fac" method="POST">
        <fieldset>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <Field>
                <Label htmlFor="message">Message*</Label>
                <TextArea id="message" name="message" rows={9} required></TextArea>
              </Field>
            </div>
            <div>
              <Field>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" />
              </Field>

              <Field>
                <Label htmlFor="email">Email*</Label>
                <Input type="email" id="email" name="email" required />
              </Field>

              <Field className="checkbox">
                <Input
                  type="checkbox"
                  id="contact-permission"
                  name="contact-permission"
                  value="Granted"
                  required
                />
                <Label style={{fontWeight: 'normal'}} htmlFor="contact-permission">
                  Please get back to me ASAP and treat my details with respect in line with your{' '}
                  <Link to="/privacy-policy/">privacy policy</Link>.
                </Label>
              </Field>
            </div>
          </div>

          <input type="hidden" name="source" value="https://gotripod.com/" />
          <button type="submit">Send it</button>
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

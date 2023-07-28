

import { Service } from '~/types'
import BaseCard from './base-card'
import Enquire from './enquire'

interface Props {
  services: Service[]
}

const ServiceList = ({ services }: Props) => {
  return (
    <ul className='list-none z-100 relative -mt-4'>
      {services.map((service, idx) => (
        <li key={idx}  className='mb-10'>
          <BaseCard {...(idx % 2 !== 0 && { alternate: true })}>
            <div className="z-10 relative py-8">
              {idx === 0 && <h1 className='text-headingBlue text-4xl font-bold'>We are Go Tripod.</h1>}
              <h2 className='text-4xl font-bold'>{service.title}</h2>
              <div className='mt-8 mb-8 text-gray-400 w-1/3' dangerouslySetInnerHTML={{ __html: service.body }} />
              <Enquire to="/contact">Enquire</Enquire>
            </div>

            <img className='w-2/3 absolute bottom-0 right-0 z-0' src={service.imageUrl} alt={service.title} loading="lazy" />
          </BaseCard>
        </li>
      ))}
    </ul>
  )
}

export default ServiceList

// const Item = styled(BaseCard)<{ alternate?: boolean }>`
//   ${Theme.cardFlare}

//   &:before {
//     ${(props) => (props.alternate ? 'right: 0; left: auto;' : '')};
//   }
//   overflow: hidden;
//   position: relative;
//   padding: ${px2rem(Theme.gutter * 4)} ${px2rem(Theme.gutter * 5)};
//   margin-bottom: ${px2rem(Theme.gutter * 5)};

//   .contentWrap {
//     width: 60%;
//   }

//   img {
//     width: 60%;
//     position: absolute;
//     bottom: 0;
//     right: 0;
//   }

//   h1 {
//     color: ${Theme.colours.headingBlue};
//     font-size: ${px2rem(40)};
//     margin: 0;
//     position: relative;
//     z-index: 10;
//   }

//   h2 {
//     margin-top: 0;
//     position: relative;
//     z-index: 10;
//     font-size: ${Theme.fontSize.h2}px;
//   }

//   .body {
//     position: relative;
//     z-index: 10;

//     color: #999;
//     width: 60%;
//     line-height: 150%;
//     margin: ${px2rem(Theme.gutter * 2)} 0 ${px2rem(Theme.gutter * 3)} 0;
//   }

//   ${mqLess(breakpoints.medium)} {
//     margin: ${px2rem(Theme.gutter * 2)} ${px2rem(Theme.gutter * 2)};
//     padding: ${px2rem(Theme.gutter * 2)};
//     img {
//       display: none;
//     }

//     .contentWrap,
//     .body,
//     h2 {
//       width: 100%;
//     }

//     h1,
//     h2 {
//       font-size: ${px2rem(30)};
//     }

//     .body {
//       margin-bottom: ${Theme.gutter * 2}px;
//     }
//   }
// `

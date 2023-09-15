import Layout from '../components/layout'
import Column from '../components/column'
import BaseCard from '../components/home/base-card'
import PageTitle from '../components/page-title'

const About = () => {
    return <Layout testimonial={undefined}>
    <Column slim>
           <PageTitle title="Want the internet to work for you?" subTitle="Let's talk" />
       </Column>
       <Column className='mt-12'>
           <BaseCard cardflare={false}>
                
              
           </BaseCard>
       </Column>
      
   </Layout>
}

export default About
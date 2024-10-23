import AboutScrum from '@/components/aboutscrum/AboutScrum';
// import FlowMateService from '@/components/flowMateService/FlowMateService';
import TeamOrganize from '@/components/organize/TeamOrganize';

const AboutPage = () => {


  return (

    <div className="bg-gray-50 py-12">
      <AboutScrum />
      <TeamOrganize />
      {/* <FlowMateService/> */}
      <section className='p-10'>
        <div>Team page show</div>
        <p>hello psuh</p>
      </section>




    </div>
  );
};

export default AboutPage;

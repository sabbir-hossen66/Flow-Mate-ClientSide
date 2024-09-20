import AboutScrum from '@/components/aboutscrum/AboutScrum';
// import FlowMateService from '@/components/flowMateService/FlowMateService';
import TeamOrganize from '@/components/organize/TeamOrganize';

const AboutPage = () => {
 

  return (

    <div className="bg-gray-50 py-12">   
      <AboutScrum/>
      <TeamOrganize/>
      {/* <FlowMateService/> */}

    <div className="bg-gray-50 py-12">
      <AboutScrum/>
      <div className="text-center mb-12">
        <h2 className="text-gray-500 uppercase tracking-wider">About</h2>
        <h1 className="text-4xl font-bold mt-4">The platform that brings your team together.</h1>
        <p className="mt-2 text-lg text-gray-700">Collaborate, manage projects, and reach new productivity peaks with Trello.</p>
      </div>

      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`bg-white shadow-lg rounded-lg p-6 transform h-[500px] lg:h-[420px] transition-transform duration-300 ease-in-out hover:shadow-xl hover:scale-105 ${
              index === 1
                ? 'scale-105 translate-y-[-20px] mt-10 lg:mt-32' // Make the middle card larger and slightly elevated
                : ''
            }`}
          >
            <img
              className={`w-full h-48 object-cover rounded-md mb-6 hover:scale-100${
                index === 1 ? 'h-56' : ''
              }`} // Middle card image will have slightly larger height
              src={service.image}
              alt={service.title}
            />
            <div className="flex items-center justify-between mb-4">
              <span className="text-blue-500 text-xl font-semibold">{`0${service.id}`}</span>
              <button className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                Active Status
              </button>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
      
      <FlowMateService/>

    </div>
  );
};

export default AboutPage;

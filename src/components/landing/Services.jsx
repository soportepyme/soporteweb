
function Services() {
  return (
    <section id="services" className="p-16">
      <h2 className="text-4xl font-bold text-center mb-8">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="p-8 border rounded-lg text-center">Tuning</div>
        <div className="p-8 border rounded-lg text-center">Brakes</div>
        <div className="p-8 border rounded-lg text-center">Scanner</div>
        <div className="p-8 border rounded-lg text-center">Engine</div>
      </div>
    </section>
  );
}

export default Services;

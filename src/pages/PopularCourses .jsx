const courses = [
  {
    title: "Photography",
    instructor: "Amy Drufesne",
    description:
      "Blandit accumsan ei vis, maiorum epicurei at mei nibh viderer ius pri",
    price: 120,
    image: "path-to-photography-image",
    students: 1,
    duration: "2 hours",
  },
  {
    title: "Statistics",
    instructor: "Martina Moore",
    description:
      "Blandit accumsan ei vis, maiorum epicurei at mei nibh viderer ius pri",
    price: 190,
    image: "path-to-statistics-image",
    students: 1,
    duration: "2 hours",
  },
  {
    title: "Learning CAD",
    instructor: "Martina Moore",
    description:
      "Blandit accumsan ei vis, maiorum epicurei at mei nibh viderer ius pri",
    price: 190,
    image: "path-to-cad-image",
    students: 1,
    duration: "2 hours",
  },
  {
    title: "Sports Stats",
    instructor: "Taylor Fink",
    description:
      "Blandit accumsan ei vis, maiorum epicurei at mei nibh viderer ius pri",
    price: 160,
    image: "path-to-sports-image",
    students: 1,
    duration: "2 hours",
  },
];

const PopularCourses = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-4">Popular Courses</h2>
        <p className="text-center mb-10">
          Etiam porttitor risus massa nec condiment gravida nibh vel velit
          auctor aliquet. Aenean sollicitudinlorem quis bibendum auci elit
          consequat ipsutis sem nibh id elitduis sed
        </p>
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                className="w-full h-48 object-cover"
                src={course.image}
                alt={course.title}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.instructor}</p>
                <p className="text-gray-600 mb-6">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-500 font-bold text-lg">
                    ${course.price}
                  </span>
                </div>
              </div>
              <div className="px-6 pb-6 flex justify-between items-center text-gray-600">
                <div className="flex items-center">
                  <span className="mr-2">👥</span> {course.students}
                </div>
                <div className="flex items-center">
                  <span className="mr-2">⏱</span> {course.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;

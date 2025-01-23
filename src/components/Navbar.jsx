import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-xl font-bold">Tutor Website</div>
        <div className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/tutors">Tutors</Link>
          <Link href="/bookings">Bookings</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

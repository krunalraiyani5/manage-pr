import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathName = usePathname();
  const pathnames = pathName.split("/").filter((x) => x);

  // Function to convert dash-case to Camel Case with spaces
  const formatRouteName = (pathname) => {
    return pathname
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  return (
    <nav className="bg-gray-200 p-4">
      <ol className="list-none flex">
        <li className="flex items-center">
          <Link href="/" className="text-gray-500 font-bold">
            Home
          </Link>
          {pathnames.length > 0 && (
            <span className="mx-2 font-bold">{">"}</span>
          )}
        </li>
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const formattedName = formatRouteName(pathname);
          return (
            <li key={pathname} className="flex items-center">
              <Link
                href={routeTo}
                className={`font-bold ${
                  isLast ? "text-black" : "text-gray-500 "
                }`}
              >
                {formattedName}
              </Link>
              {!isLast && <span className="mx-2 font-bold">{">"}</span>}
            </li>
          );
        })}
        {pathnames.length === 0 && (
          <li className="flex items-center">
            <span className="text-gray-500">Home</span>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

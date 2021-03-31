export default function Home({ photos }) {
  return (
    <div className="p-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {photos.map(
          (photo) =>
            console.log(photo) || (
              <Image url={photo.file.formats.large.url} key={photo.id} />
            )
        )}
      </div>
    </div>
  );
}

function Image({ url }) {
  return (
    <div className="">
      {/* image itself */}
      <div className="group relative">
        {/* image shadow */}
        <div className="absolute h-full w-full -right-3 -bottom-3 bg-black rounded-lg transform group-hover:-translate-x-2 group-hover:-translate-y-2 transition duration-200"></div>

        <img
          src={`http://localhost:1337${url}`}
          className="relative rounded-lg"
        />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/photos");
  const photos = await res.json();

  return { props: { photos } };
}

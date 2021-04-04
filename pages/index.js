export default function Home({ photos }) {
  return (
    <div className="p-20">
      {photos.length > 0
        ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {photos.map(
            (photo) =>
              console.log(photo) || (
                <Image url={photo.file.formats.large.url} key={photo.id} />
              )
          )}
        </div>
        : <div className="text-lg text-gray-400">
            Waiting for the artists...
          </div>
      }
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
          src={`https://unsplash-clone-strapi-2-3ej7k.ondigitalocean.app${url}`}
          className="relative rounded-lg"
        />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://unsplash-clone-strapi-2-3ej7k.ondigitalocean.app/photos"
  );
  const photos = await res.json();

  return { props: { photos } };
}

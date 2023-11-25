import Image from "next/image";
const SkillerLogo = () => {
  return (
    <div>
      <Image
        src="/logo.svg"
        alt="Skiller logo"
        priority={true}
        width={250}
        height={100}
      />
    </div>
  );
};

export default SkillerLogo;

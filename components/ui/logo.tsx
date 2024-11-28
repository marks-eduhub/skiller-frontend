import Image from "next/image";

interface SkillerLogoProps {
  minimized?: boolean; 
}

const SkillerLogo = ({ minimized = false }: SkillerLogoProps) => {
  return (
    <div>
      {minimized ? null : ( 
        <Image
          src="/logo.svg"
          alt="Skiller logo"
          priority={true}
          width={250}
          height={100}
        />
      )}
    </div>
  );
};

export default SkillerLogo;

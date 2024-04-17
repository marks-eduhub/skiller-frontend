import Image from "next/image";

interface SkillerLogoProps {
  minimized?: boolean; // Make the prop optional
}

const SkillerLogo = ({ minimized = false }: SkillerLogoProps) => {
  return (
    <div>
      {minimized ? null : ( // Conditionally render the logo if not minimized
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

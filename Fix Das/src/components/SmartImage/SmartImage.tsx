import { CSSProperties, ImgHTMLAttributes, useState } from "react";

type SmartImageProps = {
	src: string;
	alt: string;
	style?: CSSProperties;
} & ImgHTMLAttributes<HTMLImageElement>;

function SmartImage({ src, alt, ...props }: SmartImageProps) {
	const [loaded, setLoaded] = useState(false);

	return (
		<img
			src={src}
			alt={alt}
			onLoad={() => setLoaded(true)}
			style={{
				width: "120",
				height: "120",
				objectFit: "cover",
				opacity: loaded ? 1 : 0,
				transition: "opacity 0.5s ease-in",
				...props.style,
			}}
			{...props}
		/>
	);
}

export default SmartImage;

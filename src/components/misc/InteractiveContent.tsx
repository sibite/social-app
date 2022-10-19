import { Link } from '@chakra-ui/react';

interface Props {
  textContent: string;
}

const URLRegEx = /(?:http|https):\/\/\S+[.:]\S+/gi;

const InteractiveContent: React.FC<Props> = ({ textContent }) => {
  const matches = Array.from(textContent.matchAll(URLRegEx));

  const elements: React.ReactNode[] = [];

  if (matches.length === 0) return <span>{textContent}</span>;

  elements.push(textContent.slice(0, matches[0].index));

  for (let i = 0; i < matches.length; i += 1) {
    const match = matches[i];
    const nextMatch = matches[i + 1];
    const index = match.index!;
    const url = match[0];
    const nextText = textContent.slice(index + url.length, nextMatch?.index);

    elements.push(
      <Link href={url} target="_blank">
        {url}
      </Link>
    );
    if (nextText.length) elements.push(<span>{nextText}</span>);
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{elements}</>;
};
export default InteractiveContent;

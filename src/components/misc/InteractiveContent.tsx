import { As, ChakraComponent, Link, LinkProps } from '@chakra-ui/react';

interface Props {
  textContent: string;
  linkComponent?: React.FC<LinkProps>;
}

const URLRegEx = /(?:http|https):\/\/\S+[.:]\S+/gi;

const InteractiveContent: React.FC<Props> = ({
  textContent,
  linkComponent,
}) => {
  const matches = Array.from(textContent.matchAll(URLRegEx));

  const CustomLink = linkComponent ?? Link;

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
      <CustomLink as={Link} href={url} target="_blank" key={`${i}link`}>
        {url}
      </CustomLink>
    );
    if (nextText.length)
      elements.push(<span key={`${i}text`}>{nextText}</span>);
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{elements}</>;
};
export default InteractiveContent;

import NextLink from "next/link";
import React from "react";

interface Props {
  href?: string;
  link: string;
  className?: string;
  children: React.ReactNode;
}

const Link = ({ href, link, className, children }: Props) => {
  // const onClick = (event) => {
  //   // Do nothing if it's an external link
  //   if (link.startsWith("http")) return;

  //   event.preventDefault();
  //   // Set the router to the new url.
  //   actions.router.set(link);

  //   // Scroll the page to the top
  //   window.scrollTo(0, 0);

  //   // if the menu modal is open, close it so it doesn't block rendering
  //   if (state.theme.isMobileMenuOpen) {
  //     actions.theme.closeMobileMenu();
  //   }
  // };

  return (
    <NextLink href={href ? href : link} as={href ? link : null}>
      <a onClick={() => {}} className={className}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
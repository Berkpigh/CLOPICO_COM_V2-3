//import { Text } from "../../lib/text/text";
import { ReactNode } from 'react'
import { PageMetaTags } from "../../lib/next-ui/PageMetaTags"
import { RegularPage } from "../../lib/ui/RegularPage"
//import { SourceCodeLink } from '@product/ui-demo/components/SourceCode/SourceCodeLink'
//import { YouTubeLink } from '@product/ui-demo/components/YouTubeLink'

/* interface Props extends ChildrenProp {
  title: string
  seoTitle?: string
  seoDescription?: string
} */

export type Props = {
  children: ReactNode
}

export const MyDemoPage = ({
  children,
    }: Props) => {
    return (
        <div>{children}</div>
    )
}
/*   return (
    <RegularPage
      title={
        <HStack alignItems="center" gap={4}>
          <Text as="h1" weight="600" size={24} color="regular">
            {title}
          </Text>
          <SourceCodeLink
            to={`https://github.com/radzionc/radzionkit/blob/main/product/ui-demo/pages${pathname}.tsx`}
          />
          {youtubeVideoId && <YouTubeLink videoId={youtubeVideoId} />}
        </HStack>
      }
    >
      <PageMetaTags title={seoTitle} description={seoDescription} />
      {children}
    </RegularPage>
  )
 */
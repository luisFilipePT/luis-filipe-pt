import Image from 'next/image'
import Link from 'next/link'
import { type IContribution } from '@/sanity/schemas/contribution'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type OpenSourceContributionCardProps = {
  contribution: Readonly<
    Pick<IContribution, '_id' | 'label' | 'description' | 'logo' | 'link'>
  >
}

export function OpenSourceContributionCard({
  contribution,
}: OpenSourceContributionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{contribution.label}</CardTitle>
        <CardDescription>
          <div className="flex items-center">
            <Image
              src={contribution.logo}
              width={40}
              height={40}
              alt="ReatJs logo"
              className="mr-2.5 rounded"
            />
            <Link href={contribution.link} target="_blank" rel="noopener">
              {contribution.link}
            </Link>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>{contribution.description}</CardContent>
    </Card>
  )
}

import { papers } from '../../data/papers'

export function getPaperById(paperId: string | undefined) {
  return papers.find((paper) => paper.id === paperId)
}

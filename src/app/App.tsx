import { useEffect } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Layout } from './Layout'
import { useProjectManagerStore } from '@/store/projectManagerStore'
import {  Box } from '@chakra-ui/react'
import { Toaster } from '@/components/ui/toaster.tsx'

export function App() {
  const initializeProject = useProjectManagerStore((s) => s.initializeProject)

  useEffect(() => {
    initializeProject()
  }, [initializeProject])

  return (
    <TooltipProvider>
      <Box h={'full'} w={'full'}>
        <Layout />
        <Toaster  />
      </Box>
    </TooltipProvider>
  )
}

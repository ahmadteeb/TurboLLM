// downloadFile failure carries a stable code (the release-install job vocabulary reads it).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { join } from 'node:path'
import { tmpDir } from '../test-support/tmp'
import { downloadFile } from './download'

test('an HTTP failure carries code download_failed and keeps its message text', async () => {
  const dest = join(tmpDir('dlfile-'), 'a.zip')
  const notFound = (async () => new Response('no', { status: 404 })) as typeof fetch
  await assert.rejects(downloadFile('https://x.test/a.zip', dest, undefined, undefined, notFound), (e: Error & { code?: string }) => {
    return e.code === 'download_failed' && e.message === 'download failed: HTTP 404'
  })
})

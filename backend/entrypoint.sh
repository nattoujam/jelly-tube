#!/bin/bash
# File              : entrypoint.sh
# Author            : nattoujam <public.kyuuanago@gmail.com>
# Date              : 2023 04/28
# Last Modified Date: 2023 04/28
# Last Modified By  : nattoujam <public.kyuuanago@gmail.com>

set -e
rm -f /app/tmp/pids/server.pid
exec "$@"
# ifttt-status

## Usage

```yaml
uses: betahuhn/ifttt-status@v1
with:
  event: ${{ secrets.EVENT }} # your-webhook-event
  key: ${{ secrets.TOKEN }} # your-webhook-secret-key
  status: ${{ job.status }} # do not change
```

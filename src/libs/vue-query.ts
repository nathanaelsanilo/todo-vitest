export function useMutation() {
  function mutate() {
    console.log('mutate!')
  }

  return { mutate }
}

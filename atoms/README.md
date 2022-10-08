# Atoms

 This app uses [Recoil](https://recoiljs.org/) to handle state management.

An atom represents a piece of state. Atoms can be read from and written to from any component. Components that read the value of an atom are implicitly subscribed to that atom, so any atom updates will result in a re-render of all components subscribed to that atom. Read more in the [official docs](https://recoiljs.org/docs/introduction/getting-started#atom).

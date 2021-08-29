// @ts-check
'use strict';

import { ChildDeletion, NoFlags, PassiveMask } from './ToyReactFiberFlags';
import { detachDeletedInstance } from './ToyReactFiberHostConfig';
import { HostComponent } from './ToyReactWorkTags';

// https://github.com/facebook/react/blob/19092ac8c354b92c2e0e27b73f391571ad452505/packages/shared/ReactFeatureFlags.js#L128
const deletedTreeCleanUpLevel = 3;

let nextEffect = null;

export function commitPassiveMountEffects(root, finishedWork) {
  nextEffect = finishedWork;
  commitPassiveMountEffects_begin(finishedWork, root);
}

function commitPassiveMountEffects_begin(subtreeRoot, root) {
  while (nextEffect !== null) {
    const fiber = nextEffect;
    const firstChild = fiber.child;

    if ((fiber.subtreeFlags & PassiveMask) !== NoFlags && firstChild !== null) {
      // ensureCorrectReturnPointer(firstChild, fiber);
      nextEffect = firstChild;
    } else {
      commitPassiveMountEffects_complete(subtreeRoot, root);
    }
  }
}

function commitPassiveMountEffects_complete(subtreeRoot, root) {
  while (nextEffect !== null) {
    const fiber = nextEffect;
    // if ((fiber.flags & Passive) !== NoFlags) {
    //   try {
    //     commitPassiveMountOnFiber(root, fiber);
    //   } catch (error) {
    //     captureCommitPhaseError(fiber, fiber.return, error);
    //   }
    // }

    if (fiber === subtreeRoot) {
      nextEffect = null;
      return;
    }

    const sibling = fiber.sibling;
    if (sibling !== null) {
      // ensureCorrectReturnPointer(sibling, fiber.return);
      nextEffect = sibling;
      return;
    }

    nextEffect = fiber.return;
  }
}

// function commitPassiveMountOnFiber(finishedRoot, finishedWork) {
//   switch (finishedWork.tag) {
//     case FunctionComponent:
//     case ForwardRef:
//     case SimpleMemoComponent: {
//       if ()
//     }
//   }
// }

export function commitPassiveUnmountEffects(firstChild) {
  nextEffect = firstChild;
  commitPassiveUnmountEffects_begin();
}

function commitPassiveUnmountEffects_begin() {
  while (nextEffect !== null) {
    const fiber = nextEffect;
    const child = fiber.child;

    if ((nextEffect.flags & ChildDeletion) !== NoFlags) {
      const deletions = fiber.deletions;
      if (deletions !== null) {
        for (let i = 0; i < deletions.length; i++) {
          const fiberToDelete = deletions[i];
          nextEffect = fiberToDelete;
          commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
            fiberToDelete,
            fiber
          );
        }

        if (deletedTreeCleanUpLevel >= 1) {
          const previousFiber = fiber.alternate;
          if (previousFiber !== null) {
            let detachedChild = previousFiber.child;
            if (detachedChild !== null) {
              previousFiber.child = null;
              do {
                const detachedSibling = detachedChild.sibling;
                detachedChild.sibling = null;
                detachedChild = detachedSibling;
              } while (detachedChild !== null);
            }
          }
        }

        nextEffect = fiber;
      }
    }

    if ((fiber.subtreeFlags & PassiveMask) !== NoFlags && child !== null) {
      // ensureCorrectReturnPointer(child, fiber);
      nextEffect = child;
    } else {
      commitPassiveUnmountEffects_complete();
    }
  }
}

function commitPassiveUnmountEffects_complete() {
  while (nextEffect !== null) {
    const fiber = nextEffect;

    const sibling = fiber.sibling;
    if (sibling !== null) {
      // ensureCorrectReturnPointer(sibling, fiber.return);
      nextEffect = sibling;
      return;
    }

    nextEffect = fiber.return;
  }
}

function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
  deletedSubtreeRoot,
  nearestMountedAncestor
) {
  while (nextEffect !== null) {
    const fiber = nextEffect;

    const child = fiber.child;

    if (child !== null) {
      nextEffect = child;
    } else {
      commitPassiveUnmountEffectsInsideOfDeletedTree_complete(
        deletedSubtreeRoot
      );
    }
  }
}

function commitPassiveUnmountEffectsInsideOfDeletedTree_complete(
  deletedSubtreeRoot
) {
  while (nextEffect !== null) {
    const fiber = nextEffect;
    const sibling = fiber.sibling;
    const returnFiber = fiber.return;

    if (deletedTreeCleanUpLevel >= 2) {
      detachFiberAfterEffects(fiber);
      if (fiber === deletedSubtreeRoot) {
        nextEffect = null;
        return;
      }
    } else {
      if (fiber === deletedSubtreeRoot) {
        detachFiberAfterEffects(fiber);
        nextEffect = null;
        return;
      }
    }

    if (sibling !== null) {
      nextEffect = sibling;
      return;
    }

    nextEffect = returnFiber;
  }
}

function detachFiberAfterEffects(fiber) {
  const alternate = fiber.alternate;
  if (alternate !== null) {
    fiber.alternate = null;
    detachFiberAfterEffects(alternate);
  }

  if (!(deletedTreeCleanUpLevel >= 2)) {
    fiber.child = null;
    fiber.deletions = null;
    fiber.dependencies = null;
    fiber.memoizedProps = null;
    fiber.memoizedState = null;
    fiber.pendingProps = null;
    fiber.sibling = null;
    fiber.stateNode = null;
    fiber.updateQueue = null;
  } else {
    fiber.child = null;
    fiber.deletions = null;
    fiber.sibling = null;

    if (fiber.tag === HostComponent) {
      const hostInstance = fiber.stateNode;
      if (hostInstance !== null) {
        detachDeletedInstance(hostInstance);
      }
    }

    fiber.stateNode = null;

    if (deletedTreeCleanUpLevel >= 3) {
      fiber.return = null;
      fiber.dependencies = null;
      fiber.memoizedProps = null;
      fiber.memoizedState = null;
      fiber.pendingProps = null;
      fiber.stateNode = null;
      fiber.updateQueue = null;
    }
  }
}

// function ensureCorrectReturnPointer(fiber, expectedReturnFiber) {
//   fiber.return = expectedReturnFiber;
// }

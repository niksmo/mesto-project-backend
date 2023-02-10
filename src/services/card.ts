import mongoose from 'mongoose';
import CardModel from '../models/card';
import ApiError from '../exceptions/api-error';
import { CardServiceTypes } from './types';
import { RelatedCardSchemaKeys } from '../models/types';

async function postCard(
  props: CardServiceTypes.PostCardIn
): CardServiceTypes.PostCardOut {
  const { ownerId, name, link } = props;
  try {
    const card = new CardModel({ name, link, owner: ownerId });

    const preservedCard = await card.save();

    const populatedPreservedCard = await preservedCard.populate(
      RelatedCardSchemaKeys.owner
    );

    return populatedPreservedCard;
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw ApiError.BadRequest(error.message);
    }
    throw ApiError.InternalError();
  }
}

async function getCards(): CardServiceTypes.GetCardsOut {
  try {
    const preservedCards = await CardModel.find({}).populate([
      RelatedCardSchemaKeys.owner,
      RelatedCardSchemaKeys.likes,
    ]);

    return preservedCards;
  } catch (error) {
    throw ApiError.InternalError();
  }
}

async function deleteCard(cardId: string): CardServiceTypes.DeleteCardOut {
  try {
    const deletedCard = await CardModel.findByIdAndDelete(cardId).populate([
      RelatedCardSchemaKeys.likes,
      RelatedCardSchemaKeys.owner,
    ]);

    if (deletedCard === null) {
      throw ApiError.NotFound();
    }
    return deletedCard;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof mongoose.Error.CastError) {
      throw ApiError.BadRequest('incorrect id template');
    }

    throw ApiError.InternalError();
  }
}

async function likeCard(
  props: CardServiceTypes.LikeCardIn
): CardServiceTypes.LikeCardOut {
  try {
    const { cardId, userId } = props;

    const preservedCard = await CardModel.findByIdAndUpdate(
      cardId,
      {
        $addToSet: { likes: userId },
      },
      { new: true }
    ).populate([RelatedCardSchemaKeys.likes, RelatedCardSchemaKeys.owner]);

    if (preservedCard === null) {
      throw ApiError.NotFound();
    }
    return preservedCard;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof mongoose.Error.CastError) {
      throw ApiError.BadRequest('incorrect id template');
    }

    throw ApiError.InternalError();
  }
}

async function dislikeCard(
  props: CardServiceTypes.DislikeCardIn
): CardServiceTypes.DislikeCardOut {
  try {
    const { cardId, userId } = props;

    const preservedCard = await CardModel.findByIdAndUpdate(
      cardId,
      {
        $pull: { likes: userId },
      },
      { new: true }
    ).populate([RelatedCardSchemaKeys.likes, RelatedCardSchemaKeys.owner]);

    if (preservedCard === null) {
      throw ApiError.NotFound();
    }
    return preservedCard;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof mongoose.Error.CastError) {
      throw ApiError.BadRequest('incorrect id template');
    }

    throw ApiError.InternalError();
  }
}

export default { postCard, getCards, deleteCard, likeCard, dislikeCard };
